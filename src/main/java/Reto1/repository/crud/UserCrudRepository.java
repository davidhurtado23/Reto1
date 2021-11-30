package Reto1.repository.crud;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import Reto1.Model.User;

public interface UserCrudRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);

}
