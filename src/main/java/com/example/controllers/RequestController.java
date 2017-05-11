package com.example.controllers;

import com.example.models.*;
import com.example.repositories.RequestRepository;
import com.example.repositories.StatusRepository;
import com.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by Admira on 08-May-17.
 */
@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private UserRepository userr;
    @Autowired
    private RequestRepository reqr;
    @Autowired
    private StatusRepository statusr;

    @RequestMapping("/{iduser}/addRequest")
    public Request add( @PathVariable("iduser") long iduser, @RequestBody ReqBody req) throws Exception
    {

        RegisteredUser user=userr.findById(iduser);
        Status status=statusr.findByStatus("created");


        if(req.description==null)
        {
            throw new Exception("Trazena polja za unos incidenta nisu ispravno popunjena.");
        }

        Request newreq=new Request();
        newreq.setDescription(req.description);
        newreq.setUser(user);
        newreq.setStatus(status);
        newreq.setCreated(new Date()); //stavice na sadasnje vrijeme
        newreq.setContactMethod(req.contactMethod);
        newreq.setReportMethod(req.reportMethod);
        if(req.title!=null) newreq.setTitle(req.title);
        return  reqr.save(newreq);
    }

    @RequestMapping(value = "/userRequest", method = RequestMethod.GET)
    @ResponseBody
    public List<Request> findRequestsByUserId(@RequestParam("userid") Long id) {
        RegisteredUser user=userr.findById(id);
        return reqr.getByUser(user);
    }

    @RequestMapping("/{id}/delete")
    public void deleteRequest(@PathVariable("id") long id) throws Exception
    {
        Request i=reqr.findById(id);

        if(i.getDescription()==null)
        {
            throw new Exception("Ne postoji incident sa tim id-em");
        }

        reqr.delete(i);
    }
    
    @RequestMapping("/all")
    public List<Request> all(){
    	return (List<Request>)reqr.findAll();
    }

    private static class ReqBody{
        public String description;
        public int reportMethod;
        public int contactMethod;
        public String title;
    }
}

