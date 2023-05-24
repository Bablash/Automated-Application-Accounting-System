package App.Controller;

import App.Model.ProcedureEmployee;
import App.Service.ProcedureEmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procedures_employees")
public class ProcedureEmployeeController {
    private final ProcedureEmployeeService procedureEmployeeService;

    public ProcedureEmployeeController(ProcedureEmployeeService procedureEmployeeService) {
        this.procedureEmployeeService = procedureEmployeeService;
    }

    @GetMapping
    public List<ProcedureEmployee> getProcedureEmployees() {
        return procedureEmployeeService.findAllProcedureEmployee();
    }
    @GetMapping("/{id}")
    public ProcedureEmployee getProcedureEmployee(@PathVariable Integer id) {
        return procedureEmployeeService.findProcedureEmployee(id);
    }

    @GetMapping("/employee/{id}")
    public List<ProcedureEmployee> getProcedureEmployeeByEmployeeId(@PathVariable Integer id) {
        return procedureEmployeeService.getProcedureEmployeeByEmployeeId(id);
    }

    @GetMapping("/procedure/{id}")
    public List<ProcedureEmployee> getProcedureEmployeeByProcedureId(@PathVariable Integer id) {
        return procedureEmployeeService.getProcedureEmployeeByProcedureId(id);
    }

    @GetMapping("/admin/{id}")
    public List<ProcedureEmployee> getProcedureEmployeeByProcedureIdA(@PathVariable Integer id) {
        return procedureEmployeeService.getProcedureEmployeeByProcedureId(id);
    }

    @PostMapping
    public ProcedureEmployee setProcedureEmployee(@RequestBody ProcedureEmployee procedure_employee) {
        return procedureEmployeeService.saveProcedureEmployee(procedure_employee);
    }

    @PutMapping
    public ProcedureEmployee updateProcedureEmployee(@RequestBody ProcedureEmployee procedure_employee){
        return procedureEmployeeService.updateProcedureEmployee(procedure_employee);
    }

    @DeleteMapping("/{id}")
    public ProcedureEmployee deleteProcedureEmployee(@PathVariable Integer id){
        return procedureEmployeeService.deleteProcedureEmployee(id);
    }

}

