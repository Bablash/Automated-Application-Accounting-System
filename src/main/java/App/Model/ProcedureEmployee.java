package App.Model;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name="procedure_employee")
@Data
public class ProcedureEmployee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer procedureId;
    private Integer employeeId;
}

