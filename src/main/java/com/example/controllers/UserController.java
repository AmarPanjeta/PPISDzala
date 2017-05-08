package com.example.controllers;

import javax.servlet.ServletException;

import com.example.models.Service;
import com.example.models.UserService;
import com.example.repositories.ServiceRepository;
import com.example.repositories.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.models.RegisteredUser;
import com.example.repositories.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository ur;
    @Autowired
    private UserServiceRepository usr;
    @Autowired
    private ServiceRepository sr;

    @RequestMapping("/login")
    public LoginData login(@RequestBody LoginData data) throws ServletException {

        if (data.username == null || data.username.isEmpty() || data.password == null || data.password.isEmpty()) {

            throw new ServletException("Polja nisu popunjena");

        }

        RegisteredUser user = ur.findFirstByUsernameAndPassword(data.username, data.password);
        if (user != null) {
            return data;
        } else {
            throw new ServletException("Pogresna kombinacija username-password");
        }

    }

    @RequestMapping(value = "/find", method = RequestMethod.GET)
    @ResponseBody
    public RegisteredUser findByUsername(@RequestParam("username") String username) {
        return ur.findByUsername(username);
    }

    @RequestMapping(value = "/userservices", method = RequestMethod.GET)
    @ResponseBody
    public List<Service> findServiceById(@RequestParam("userid") Long id) {
        RegisteredUser user = ur.findById(id);
        return usr.getByUser(user);
    }

    @RequestMapping(value = "/userservicesuserservice", method = RequestMethod.GET)
    @ResponseBody
    public void findServiceByUserAndService(@RequestParam("userid") Long userid, @RequestParam("serviceid") Long serviceid) {
        RegisteredUser user = ur.findById(userid);
        Service service = sr.findById(serviceid);
        List<UserService> lista = usr.getByUserAndService(user, service);
        for (UserService us : lista) {
            usr.delete(us);

        }
    }

    @RequestMapping("/register")
    public UserData register(@RequestBody UserData data) throws ServletException {

        if (data.username == null || data.username.isEmpty() || data.password == null || data.password.isEmpty() || data.surname == null || data.surname.isEmpty() || data.name == null || data.name.isEmpty() || data.address == null || data.address.isEmpty() || data.telephone.isEmpty() || data.telephone == null) {
            throw new ServletException("Polja nisu popunjena");
        }

        if (ur.findByUsername(data.username) != null) {
            throw new ServletException("Korisnicko ime je vec zauzeto");
        }

        RegisteredUser user = new RegisteredUser();
        user.setName(data.name);
        user.setUsername(data.username);
        user.setPassword(data.password);
        user.setAddress(data.address);
        user.setSurname(data.surname);
        user.setTelephone(data.telephone);
        user.setType(data.type);

        ur.save(user);
        return data;
    }


    @SuppressWarnings("unused")
    private static class UserData {

        public String username;
        public String password;
        public String name;
        public String surname;
        public String address;
        public String telephone;
        public int type;

    }

    @SuppressWarnings("unused")
    private static class LoginData {

        public String username;
        public String password;

    }
}
