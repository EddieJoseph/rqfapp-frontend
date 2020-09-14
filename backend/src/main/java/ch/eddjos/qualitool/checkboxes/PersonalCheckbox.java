package ch.eddjos.qualitool.checkboxes;

import ch.eddjos.qualitool.person.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table
public class PersonalCheckbox {
    @EmbeddedId
    PersonalCheckboxId id;
    private boolean positiv;

    @Override
    public String toString() {
        return "PersonalCheckbox{" +
                "id=" + id +
                ", positiv=" + positiv +
                ", negativ=" + negativ +
                ", sighted=" + sighted +
                ", passed=" + passed +
                '}';
    }

    private boolean negativ;
    private boolean sighted;
    private Boolean passed;


    public PersonalCheckbox copy(){
        PersonalCheckbox n = new PersonalCheckbox();
        n.negativ=this.isNegativ();
        n.passed=this.getPassed();
        n.positiv=this.isPositiv();
        n.sighted=this.isSighted();
        n.getId().setCheckboxId(this.getCheckboxId());
        n.getId().setPersonId(this.getPersonId());
        return n;
    }


    public PersonalCheckbox(){
        id=new PersonalCheckboxId();
    };

    public PersonalCheckbox(Checkbox c, Person p){
        id=new PersonalCheckboxId(c,p);
    }

    @JsonIgnore
    public PersonalCheckboxId getId() {
        return id;
    }

    public int getPersonId(){
        return id.getPersonId();
    }

    public int getCheckboxId(){
        return id.checkboxId;
    }

    public void setId(PersonalCheckboxId id) {
        this.id = id;
    }

    public boolean isPositiv() {
        return positiv;
    }

    public void setPositiv(boolean positiv) {
        this.positiv = positiv;
    }

    public boolean isNegativ() {
        return negativ;
    }

    public void setNegativ(boolean negativ) {
        this.negativ = negativ;
    }

    public boolean isSighted() {
        return sighted;
    }

    public void setSighted(boolean sighted) {
        this.sighted = sighted;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }
    @Embeddable
    public static class PersonalCheckboxId implements Serializable {
        int checkboxId;

        int personId;

        public PersonalCheckboxId(){}

        public PersonalCheckboxId(int checkboxId, int personId){
            this.checkboxId = checkboxId;
            this.personId = personId;
        }
        public PersonalCheckboxId(Checkbox c, Person p){
            this(c.getId(),p.getId());
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PersonalCheckboxId that = (PersonalCheckboxId) o;
            return checkboxId == that.checkboxId &&
                    personId == that.personId;
        }

        @Override
        public String toString() {
            return "PersonalCheckboxId{" +
                    "checkboxId=" + checkboxId +
                    ", personId=" + personId +
                    '}';
        }

        @Override
        public int hashCode() {
            return Objects.hash(checkboxId, personId);
        }

        public int getCheckboxId() {
            return checkboxId;
        }

        public void setCheckboxId(int checkboxId) {
            this.checkboxId = checkboxId;
        }

        public int getPersonId() {
            return personId;
        }

        public void setPersonId(int personId) {
            this.personId = personId;
        }
    }
}
