package br.com.mioto.javaspringzoo.repositories;

import org.springframework.stereotype.Repository;
import br.com.mioto.javaspringzoo.models.User;

@Repository
public class UserRepository {
  public User findUserByEmail(String email) {
    User user = new User(email, "123456");
    return user;
  }
}
