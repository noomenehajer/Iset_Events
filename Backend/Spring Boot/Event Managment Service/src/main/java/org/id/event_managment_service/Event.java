package org.id.event_managment_service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Document("events")
@Data
@Getter
@Setter


public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

  //  @NotEmpty(message= "name is empty")
   // @NotNull(message= "name is null")
    private String name;

   // @NotNull(message= "Date is null")
    @JsonFormat(shape = JsonFormat.Shape.STRING , pattern = "yyyy-MM-dd")
    private Date date;

    private String avatar;

   // @NotNull(message= "Description is null")
    private String description;


    private  HashMap<String,User> participents= new HashMap<String,User>() ;


    public Event(){
        super();
    }

    public Event(String id,String name,Date date, String avatar, String description){
        super();
        this.id=id;
        this.name=name;
        this.description=description;
        this.date=date;
        this.avatar=avatar;
    }

}
