package com.example.demo.controller;

import com.example.demo.entity.MessageEntity;
import com.example.demo.entity.util.Views;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repo.MessageRepository;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("message")
public class MessageController {

    // -------------- FAKE DATA --------------
    // ---------------------------------------

    private List<Map<String, String>> messages = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String, String>() {{
            put("id", "1");
            put("text", "First message");
        }});
        add(new HashMap<String, String>() {{
            put("id", "2");
            put("text", "Second message");
        }});
        add(new HashMap<String, String>() {{
            put("id", "3");
            put("text", "Third message");
        }});
    }};

    // ---------------------------------------

    // -------------- METHODS --------------
    // -------------------------------------

    private Map<String, String> getMessage(@PathVariable String id) {
        return messages.stream()
                .filter(message -> message.get("id").equals(id))
                .findFirst()
                .orElseThrow(NotFoundException::new);
    }

    // -------------- CRUD --------------
    // ----------------------------------

    /*
    @GetMapping
    public List<Map<String, String>> list() {
        return messages;
    }

    @GetMapping("{id}")
    public Map<String, String> getOne(@PathVariable String id) {
        return getMessage(id);
    }
    */

    /*
    const url = '/message';
    const data = {
        text: 'example text'
    };

    fetch(url, {
        method: 'POST',
                body: JSON.stringify(data),
                headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    */

    /*
    @PostMapping
    public Map<String, String> create(@RequestBody Map<String, String> message) {
        int a = messages.size();
        a++;
        message.put("id", String.valueOf(a));

        messages.add(message);

        return message;
    }
    */

    /*
    const url = '/message/4';
    const data = {
        text: 'example text and updated once more'
    };

    fetch(url, {
        method: 'PUT',
                body: JSON.stringify(data),
                headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    */

    /*
    @PutMapping("{id}")
    public Map<String, String> update(@PathVariable String id,
                                      @RequestBody Map<String, String> message) {
        Map<String, String> messageFromDb = getMessage(id);

        messageFromDb.putAll(message);
        messageFromDb.put("id", id);

        return messageFromDb;
    }
    */

    /*
    const url = '/message/3';

    fetch(url, {
        method: 'DELETE',
                headers:{
            'Content-Type': 'application/json'
        }
    })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    */

    /*
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Map<String, String> message = getMessage(id);

        messages.remove(message);
    }
    */
    // -------------- ----------------------
    final MessageRepository messageRepo;

    @Autowired
    public MessageController(MessageRepository messageRepo) {
        this.messageRepo = messageRepo;
    }

    @GetMapping
    @JsonView(Views.Text.class)
    public List<MessageEntity> list() {
        return messageRepo.findAll();
    }

    @GetMapping("{id}")
    @JsonView(Views.DateMessage.class) // only show de id and date creation
    public MessageEntity getOne(@PathVariable("id") MessageEntity message) {
        return message;
    }

    @PostMapping
    public MessageEntity create(
            @RequestBody MessageEntity message) throws IOException {
        message.setCreationDate(LocalDateTime.now());
        return messageRepo.save(message);
    }

    @PutMapping("{id}")
    public MessageEntity update(
            @PathVariable("id") MessageEntity messageFromDb,
            @RequestBody MessageEntity message
    ) throws IOException {
        BeanUtils.copyProperties(message, messageFromDb, "id");
        return messageRepo.save(messageFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") MessageEntity message) {
        messageRepo.delete(message);
    }

}
