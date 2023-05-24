package App.Repository;

import App.Model.Record;
import App.Model.Users;
import App.Model.enums.Role;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Users findByLogin(String login);
    Users findByIdAndLoginAndPassword(Integer id,String login, String password);
    List<Users> findByRoles(Role roles);

    List<Users> findAll(Sort sort);
}
