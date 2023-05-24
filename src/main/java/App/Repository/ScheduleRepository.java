package App.Repository;
import App.Model.Record;
import App.Model.Schedule;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    List<Schedule> findByEmployeeIdAndStatus(Integer id, Boolean status);

    List<Schedule> findByEmployeeIdAndStatusAndDateOrderByTime(Integer employeeId, Boolean status, Date date);
    List<Schedule> findByEmployeeId(Integer id);

    List<Schedule> findAll(Sort sort);
}
