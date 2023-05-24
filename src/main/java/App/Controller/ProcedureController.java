package App.Controller;

import App.Custom.CustomEmployee;
import App.Custom.CustomProcedure;
import App.Model.Procedure;
import App.Model.Users;
import App.Service.ProcedureService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/procedures")
public class ProcedureController {

    private final ProcedureService procedureService;

    public ProcedureController(ProcedureService procedureService) {
        this.procedureService = procedureService;
    }

    @GetMapping
    public List<Procedure> getAllProcedures() {
        return procedureService.findAllProcedure();
    }
    @GetMapping("/{id}")
    public Procedure getProcedure(@PathVariable Integer id) {
        return procedureService.findProcedure(id);
    }
    @GetMapping("/user/{id}")
    public Procedure getProcedureU(@PathVariable Integer id) {
        return procedureService.findProcedure(id);
    }
    @GetMapping("/admin/{id}")
    public Procedure getProcedureA(@PathVariable Integer id) {
        return procedureService.findProcedure(id);
    }

    @GetMapping("/user")
    public List<Procedure> getAllProceduresU() {
        return procedureService.findAllProcedure();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Procedure setProcedure(@RequestBody Procedure procedure) {
        return procedureService.saveProcedure(procedure);
    }

    @PutMapping
    public Procedure updateProcedure(@RequestBody Procedure procedure){
        return procedureService.updateProcedure(procedure);
    }

    @DeleteMapping("/{id}")
    public Procedure deleteProcedure(@PathVariable Integer id){
        return procedureService.deleteProcedure(id);
    }

}

