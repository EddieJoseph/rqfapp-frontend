package ch.eddjos.qualitool.checkboxes;

import ch.eddjos.qualitool.updatecache.UpdateCache;
import ch.eddjos.qualitool.updatecache.Versionized;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class CheckboxService {
    @Autowired
    private CheckboxRepository repo;
    @Autowired
    private PersonalCheckboxRepo personalCheckboxRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    UpdateCache<PersonalCheckbox> updateCach = new UpdateCache<>(1000);

    public Versionized<PersonalCheckbox> getUpdates(int personId, int cachNr){
        return updateCach.getUpdates(cachNr,personId);
    }

    public List<Checkbox> getStructure(){
        return repo.findAllByLevelEqualsOrderById(0);
    }

    public Versionized<PersonalCheckbox> getPersonalData(int person_id){
        return updateCach.versionize(personalCheckboxRepo.findAllByIdPersonIdEquals(person_id));
    }

    @Transactional
    public Versionized<PersonalCheckbox> putCheckbox(int person_id, int checkbox_id, PersonalCheckboxDTO dto){
        if(dto.positiv&&dto.negativ){
            throw new IllegalArgumentException("Checkbox can not be positiv and negativ at the same time.");
        }
        PersonalCheckbox pc=personalCheckboxRepo.getOne(new PersonalCheckbox.PersonalCheckboxId(checkbox_id,person_id));
        if(pc==null) {
            throw new IllegalArgumentException("Unvalid checkbox id.");
        }
        if (dto.sighted==pc.isSighted()&&dto.negativ==pc.isNegativ()&&dto.positiv==pc.isPositiv()){
            return updateCach.versionize(pc);
        }
        if(pc.isSighted()&&dto.sighted){
            throw new IllegalArgumentException("Only unsighted checkboxes can be changed.");
        }
        Checkbox checkbox = repo.getOne(pc.getCheckboxId());
        if((dto.negativ!=pc.isNegativ()||dto.positiv!=pc.isPositiv())&&(checkbox.getSeverity()<2&&checkbox.getBoxes().size()!=0)){
            throw new IllegalArgumentException("Checkbox values of checkboxes with subcheckboxes can not be changed unless they are optional.");
            //TODO Reject if checkbox has subcheckboxes and severity of checkbox is smaller than 2
        }

        pc.setNegativ(dto.negativ);
        pc.setPositiv(dto.positiv);
        pc.setSighted(dto.sighted);

        Versionized<PersonalCheckbox> ret = updateCach.update(pc.getPersonId(), pc.getCheckboxId(), pc.copy());

        List<Versionized<PersonalCheckbox>> vList = testCheckboxes(person_id);
        if(vList.size()>0){
            ret = vList.stream().reduce(ret,(acc,c)->acc.combine(c));
        }
        return ret;
    }

    @Transactional
    public List<Versionized<PersonalCheckbox>> testCheckboxes(int personId){
        List<Checkbox> pclist=getStructure();
        List<Versionized<PersonalCheckbox>> vList = new ArrayList<>();
        for(Checkbox cb:pclist){
            vList.addAll(evaluateCheckbox(cb,personId));
        }
        return vList;
    }

    @Transactional
    public List<Versionized<PersonalCheckbox>> evaluateCheckbox(Checkbox cb, int personId){

        List<Versionized<PersonalCheckbox>> vList = new ArrayList<>();

        int nrOfSub=0;
        int subFailed=0;
        int criticalFailed=0;
        int criticalNotObservedYet=0;
        int nonCriticalFailed=0;
        int nonCriticalPassed=0;
        PersonalCheckbox  pcb=personalCheckboxRepo.getOne(new PersonalCheckbox.PersonalCheckboxId(cb.getId(),personId));
        for(Checkbox subCb:cb.getBoxes()){
            PersonalCheckbox subPCb=personalCheckboxRepo.getOne(new PersonalCheckbox.PersonalCheckboxId(subCb.getId(),personId));
            if(pcb.isSighted()){
                boolean sv = subPCb.isSighted();
                subPCb.setSighted(true);
                if(!sv){
                    logger.debug("updating sighted: {}, {}",subPCb.getPersonId(),subPCb.getCheckboxId());
                    vList.add(updateCach.update(subPCb.getPersonId(),subPCb.getCheckboxId(),subPCb.copy()));
                }
            }

            if(subCb.getBoxes().size()>0) {
                vList.addAll(evaluateCheckbox(subCb, personId));
            }
            if(subCb.getSeverity()==0){//Critical
                if(subPCb.isNegativ()){
                    criticalFailed++;
                }
                if(!subPCb.isNegativ()&&!subPCb.isPositiv()&&!subPCb.isSighted()){
                    criticalNotObservedYet++;
                }
            }
            if(subCb.getSeverity()==1){//Normal
                nrOfSub++;
                if(subPCb.isNegativ()){
                    nonCriticalFailed++;
                }
                if(subPCb.isPositiv()||(subPCb.isSighted()&&!subPCb.isNegativ())){
                    nonCriticalPassed++;
                }
            }
            if(subCb.getSeverity()==2){//Nicetohave

            }
        }

        boolean neg=pcb.isNegativ();
        boolean pos=pcb.isPositiv();
        Boolean pas=pcb.getPassed();

        boolean minimum=false;
        if(cb.getSeverity()!=2) {
            if (cb.getMinimumachieved() <= nonCriticalPassed) {
                minimum = true;
                pcb.setPositiv(true);
                pcb.setNegativ(false);

            } else if (nrOfSub - nonCriticalFailed < cb.getMinimumachieved()) {
                minimum = false;
                pcb.setPositiv(false);
                pcb.setNegativ(true);
            } else {
                minimum = false;
                pcb.setPositiv(false);
                pcb.setNegativ(false);
            }
        }
        if(criticalFailed>0){
            pcb.setPassed(false);
        }else{
            if(criticalNotObservedYet>0||!minimum){
                pcb.setPassed(null);
            }else{
                pcb.setPassed(true);
            }
        }

        if(pcb.isNegativ()!=neg||pcb.isPositiv()!=pos||pcb.getPassed()!=pas){
            logger.debug("updating values: {}, {}, {}",pcb.getPersonId(),pcb.getCheckboxId(),pcb.copy());
            vList.add(updateCach.update(pcb.getPersonId(),pcb.getCheckboxId(),pcb.copy()));
        }
        return vList;
    }

}
