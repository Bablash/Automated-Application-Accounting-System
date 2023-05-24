package App.Service;

import App.Model.ProcedureEmployee;
import App.Model.Record;
import App.Repository.ProcedureEmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class ProcedureEmployeeService {
    private final ProcedureEmployeeRepository procedureEmployeeR;

    public ProcedureEmployeeService(ProcedureEmployeeRepository procedureEmployeeR) {
        this.procedureEmployeeR = procedureEmployeeR;
    }

    public ProcedureEmployee findProcedureEmployee(Integer id){
        return procedureEmployeeR.findById(id).orElse(null);
    }

    public ProcedureEmployee saveProcedureEmployee(ProcedureEmployee procedureEmployee) {
        procedureEmployeeR.save(procedureEmployee);
        return procedureEmployee;
    }

    public ProcedureEmployee deleteProcedureEmployee(Integer id)  {
        ProcedureEmployee procedureEmployee = procedureEmployeeR.findById(id).orElse(null);
        procedureEmployeeR.deleteById(id);
        return procedureEmployee;
    }

    public ProcedureEmployee updateProcedureEmployee(ProcedureEmployee procedureEmployee) {
        procedureEmployeeR.save(procedureEmployee);
        return procedureEmployee;
    }

    public List<ProcedureEmployee> findAllProcedureEmployee() {
        return procedureEmployeeR.findAll(SORT_BY_CREATED_AT_DESC);
    }

    public List<ProcedureEmployee> getProcedureEmployeeByEmployeeId(Integer id){
        return procedureEmployeeR.findByEmployeeId(id);
    }

    public List<ProcedureEmployee> getProcedureEmployeeByProcedureId(Integer id){
        return procedureEmployeeR.findByProcedureId(id);
    }

}

