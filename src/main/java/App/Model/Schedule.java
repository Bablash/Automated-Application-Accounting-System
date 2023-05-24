package App.Model;

import javax.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name="schedule")
@Data
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date date;
    private Time time;
    private Boolean status;
    private Integer employeeId;

}

