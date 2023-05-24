package App.Repository;

import App.Model.Procedure;
import App.Model.Record;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedureRepository extends JpaRepository<Procedure,Integer> {
    List<Procedure> findAll(Sort sort);
}
