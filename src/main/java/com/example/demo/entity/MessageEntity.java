package com.example.demo.entity;

import com.example.demo.entity.util.Views;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(schema = "pruebas", name = "mensajes")
@ToString(of = {"id", "text"})
@EqualsAndHashCode(of = {"id"})
@Data
public class MessageEntity {
    @Id
    @GeneratedValue
    @JsonView(Views.Id.class)
    private Long id;

    @JsonView(Views.Text.class)
    private String text;

    @Column(updatable = false, name = "fecha_creacion")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonView(Views.DateMessage.class)
    private LocalDateTime creationDate;

}
