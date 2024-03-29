package App.Service;

import App.Custom.CustomEmployee;
import App.Model.ProcedureEmployee;
import App.Model.Users;
import App.Model.enums.Role;
import App.Repository.ProcedureEmployeeRepository;
import App.Repository.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class UsersService {
    private final UsersRepository usersR;
    private final ProcedureEmployeeRepository procedureEmployeeR;
    private final PasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersR, ProcedureEmployeeRepository procedureEmployeeR, PasswordEncoder passwordEncoder) {
        this.usersR = usersR;
        this.procedureEmployeeR = procedureEmployeeR;
        this.passwordEncoder = passwordEncoder;
    }

    public Users findUser(Integer id){
        return usersR.findById(id).orElse(null);
    }

    public Users findUserByIdLoginPassword(Integer id, String login, String password){
        return usersR.findByIdAndLoginAndPassword(id, login, password);
    }

    public Users saveUser(Users users) {
        users.setActive(true);
        users.getRoles().add(Role.ROLE_USER);
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        Users optional = usersR.findByLogin(users.getLogin());
        if (optional == null) {
            usersR.save(users);
        }
        else throw new IllegalStateException("login taken");
        return users;
    }

    public Users deleteUser(Integer id)  {
        Users user = usersR.findById(id).orElse(null);
        usersR.deleteById(id);
        return user;
    }

    public Users updateUser(Users users) {
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        users.getRoles().add(Role.ROLE_USER);
        usersR.save(users);
        return users;
    }

    public List<Users> findAllUsers() {
        return usersR.findAll(SORT_BY_CREATED_AT_DESC);
    }

    public Users getUserByPrincipal(Principal principal) {
        if (principal == null) return new Users();
        return usersR.findByLogin(principal.getName());
    }

     public List<Users> getUsersByRole(Role role){
        return usersR.findByRoles(role);
     }
     public List<CustomEmployee>  getEmployees(Integer procedure_id) {
         List<CustomEmployee> tmp = new ArrayList<>();
         List<Users> employees = usersR.findByRoles(Role.ROLE_EMPLOYEE);
         List<ProcedureEmployee> procedureEmployees = procedureEmployeeR.findByProcedureId(procedure_id);

         for (Users employee : employees) {
             for (ProcedureEmployee procedureEmployee : procedureEmployees) {
                 if (employee.getId() == procedureEmployee.getEmployeeId()){
                     tmp.add(new CustomEmployee(employee.getId(), employee.getFcs()));
                 }
             }
         }
         return tmp;
     }

}

