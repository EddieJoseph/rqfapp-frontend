package ch.eddjos.qualitool.config;

import ch.eddjos.qualitool.auth.BenutzerDTO;
import ch.eddjos.qualitool.auth.BenutzerService;
import ch.eddjos.qualitool.checkboxes.Checkbox;
import ch.eddjos.qualitool.checkboxes.CheckboxRepository;
import ch.eddjos.qualitool.comments.Block;
import ch.eddjos.qualitool.comments.BlockRepository;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.io.*;
import java.util.Stack;
import java.util.stream.Stream;

@Component
public class Initializer implements ApplicationListener<ApplicationReadyEvent> {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CheckboxRepository checkboxRepository;
    private final BlockRepository blockRepository;
    private final BenutzerService benutzerService;

    private int checkboxCounter =0;
    private int blockCounter =0;

    @Value("${adminaccount.firstname:admin}")
    private String firstname;

    @Value("${adminaccount.lastname:admin}")
    private String lastname;

    @Value("${adminaccount.username:admin}")
    private String username;

    @Value("${adminaccount.password:admin}")
    private String password;

    @Inject
    public Initializer(CheckboxRepository checkboxRepository, BlockRepository blockRepository, BenutzerService benutzerService) {
        this.checkboxRepository = checkboxRepository;
        this.blockRepository = blockRepository;
        this.benutzerService = benutzerService;
    }

//    @Value("classpath:init/RQF.cbd")
//    ClassPathResource file;

    @Override
    @Transactional
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        if(checkboxRepository.findAll().size()>0){
            return;
        }

        //ClassPathResource checkboxFile = new ClassPathResource("init/RQF.cbd");
        FileSystemResource checkboxFile = new FileSystemResource("init/RQF.cbd");
//        ClassPathResource file = new ClassPathResource("./static/pictures/chaja.jpg");
//        ClassPathResource file = new ClassPathResource("C:/Users/eddie/Qualitool/backend/init/RQF.cbd");



        try {
            //logger.info("test: {}",file.);

            InputStream fileInputStream = checkboxFile.getInputStream();

//            BufferedReader reader = new BufferedReader(new FileReader());
            BufferedReader reader = new BufferedReader(new InputStreamReader(fileInputStream, "UTF-8"));
            reader.readLine();
            String line = reader.readLine();
            Stack<Checkbox> stack = new Stack<>();

            while(line != null) {
                if(StringUtils.countMatches(line,",")>=3){
                    if(getLevel(line)==0){
                        if(stack.empty()){
                            stack.push(createCheckbox(line,null));
                        }else{
                            //TODO persist current master
                            while(stack.peek().getLevel()>0){
                                stack.pop();
                            }
                            logger.info("CB:{}",stack.pop());
                            stack.push(createCheckbox(line,null));
                        }
                    }else{
                        if(getLevel(line)==stack.peek().getLevel()){
                            //level equal
                            stack.pop();
                            stack.push(createCheckbox(line,stack.peek()));

                        }else if(getLevel(line)>stack.peek().getLevel()){
                            //level higher
                            stack.push(createCheckbox(line,stack.peek()));
                        }else{
                            //level smaller
                            while(getLevel(line)<=stack.peek().getLevel()){
                                stack.pop();
                            }
                            stack.push(createCheckbox(line,stack.peek()));
                        }
                    }



//                    System.out.println(getLevel(line)+line);
//                    logger.info("CB:{}",createCheckbox(line,null));



                    //logger.info("current top: {}",stack.peek());

                }

                line=reader.readLine();
            }


            while(stack.peek().getLevel()>0){
                stack.pop();
            }
            //TODO persist current master
            logger.info("CB:{}",stack.pop());
        } catch (IOException e) {
            e.printStackTrace();
        }


        //ClassPathResource blockFile = new ClassPathResource("init/Block.qbd");
        FileSystemResource blockFile = new FileSystemResource("init/Block.qbd");

        InputStream fileInputStream = null;
        try {
            fileInputStream = blockFile.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(fileInputStream, "UTF-8"));
            reader.readLine();
            String line = reader.readLine();
            while(line != null) {
                createBlock(line);
                line=reader.readLine();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        BenutzerDTO benutzer = new BenutzerDTO();
        benutzer.setFirstName(firstname);
        benutzer.setLastName(lastname);
        benutzer.setUsername(username);
        benutzer.setPassword(password);
        benutzerService.save(benutzer);

    }

    protected Block createBlock(String name){
        Block block = new Block();
        block.setName(name);
        block.setId(blockCounter++);
        return blockRepository.save(block);
    }

    private int getLevel(String line){
        int c=0;
        while(line.length()>0&&line.charAt(0)=='\t'){
            c++;
            line=line.substring(1);
        }
        return c;
    }
    @Transactional
    protected Checkbox createCheckbox(String line,Checkbox parent) {
        String [] segments = line.trim().split(",");
        Checkbox cb = new Checkbox();
        cb.setName(segments[0].trim());
        cb.setLevel(getLevel(line));
        cb.setSeverity(Integer.parseInt(segments[1].trim()));
        if(Integer.parseInt(segments[2].trim())!=0){
            cb.setMinimumachieved(Integer.parseInt(segments[2].trim()));
        } else {
            cb.setMinimumachieved(null);
        }
        if(segments.length>3){
            //Stream.of(segments).skip(4).reduce(segments[3],(st,e)->st+","+e);
            cb.setDescription(Stream.of(segments).skip(4).reduce(segments[3],(st,e)->st+","+e).trim());
        }else{
            cb.setDescription("");
        }
        cb.setParent(parent);
        if(parent!=null){
            parent.getBoxes().add(cb);
        }
        cb.setId(checkboxCounter++);
        return checkboxRepository.save(cb);
//        return cb;
    }

}
