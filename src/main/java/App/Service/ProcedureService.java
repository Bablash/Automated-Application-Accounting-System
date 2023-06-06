package App.Service;

import App.Model.Procedure;
import App.Repository.ProcedureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class ProcedureService {
    private final ProcedureRepository procedureR;
    public ProcedureService(ProcedureRepository procedureR) {
        this.procedureR = procedureR;
    }
    public Procedure findProcedure(Integer id){
        return procedureR.findById(id).orElseThrow(() -> new ThereIsNoDataException());
    }
    public Procedure saveProcedure(Procedure procedure) {
        procedureR.save(procedure);
        return procedure;
    }
    public Procedure deleteProcedure(Integer id)  {
        Procedure procedure = procedureR.findById(id).orElse(null);
        procedureR.deleteById(id);
        return procedure;
    }
    public Procedure updateProcedure(Procedure procedure) {
        procedureR.save(procedure);
        return procedure;
    }
    public List<Procedure> findAllProcedures() {
        return procedureR.findAll(SORT_BY_CREATED_AT_DESC);
    }

}


