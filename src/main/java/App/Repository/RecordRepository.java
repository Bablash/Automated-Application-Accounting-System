package App.Repository;

import App.Custom.RecordStatistic;
import App.Model.Record;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {

    List<Record> findAll(Sort sort);
    List<Record> findByUsersId(Integer userId);
    List<Record> findByEmployeeId(Integer id);
    List<Record> findByDateBetween(Date date1, Date date2);

    @Query("select distinct u.usersId from Record u")
    List<String> findDistinctByUsersId();

    @Query("SELECT " +
            "    new App.Custom.RecordStatistic(v.procedureId, COUNT(v)) " +
            "FROM " +
            "    Record v " +
            "GROUP BY " +
            "    v.procedureId")
    List<RecordStatistic> findProcedureCount();

    List<Record> findByStatusAndDateAndTimeLessThan(String status, Date date, Date time);
}
