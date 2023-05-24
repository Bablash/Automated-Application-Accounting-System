package App.Model;

import javax.persistence.*;
import lombok.Data;
import org.springframework.data.domain.Sort;

import java.sql.Time;
import java.sql.Date;

@Entity
@Table(name="record")
@Data
public class Record {
    @Transient
    public static final Sort SORT_BY_CREATED_AT_DESC =
            Sort.by(Sort.Direction.DESC, "id");
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date date;
    private Time time;
    private String status;
    private Integer procedureId;
    private Integer employeeId;
    private Integer usersId;
}
