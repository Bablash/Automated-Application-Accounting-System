package App.Repository;
import App.Model.ProcedureEmployee;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedureEmployeeRepository extends JpaRepository<ProcedureEmployee, Integer>{
    List<ProcedureEmployee> findByEmployeeId(Integer employeeId);
    List<ProcedureEmployee> findByProcedureId(Integer procedureId);
    List<ProcedureEmployee> findAll(Sort sort);
}
