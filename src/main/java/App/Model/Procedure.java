package App.Model;

import javax.persistence.*;
import lombok.Data;

import java.sql.Time;

@Entity
@Table(name="procedure")
@Data
public class Procedure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private int price;
    private Time duration;
}
