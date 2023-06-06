package App.Controller;

import App.Model.Procedure;
import App.Service.ProcedureService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
        return procedureService.findAllProcedures();
    }
    @GetMapping("/{id}")
    public Procedure getProcedure(@PathVariable Integer id) {
        return procedureService.findProcedure(id);
    }
    @GetMapping("/user")
    public List<Procedure> getAllProceduresU() {
        return procedureService.findAllProcedures();
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProcedure(@PathVariable Integer id){
        procedureService.deleteProcedure(id);
    }

}

