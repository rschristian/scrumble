//package com.nsa.cubric.repository;
//
//import ScrumbleAPI;
//import RegistrationError;
//import User;
//import UserRepository;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.jdbc.AutoConfigureDataJdbc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.Assert.assertFalse;
//import static org.junit.Assert.assertTrue;
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@ActiveProfiles("dev")
//@AutoConfigureDataJdbc
//public class UserRepositoryTest
//    {
//        @Autowired
//        private UserRepository userRepository;
//
//        private User user;
//
//        @Before
//        public void setUp()
//            {
//                user = new User("genericUser", "generic@user.com",
//                        "genericPassword1", "genericPassword1");
//                user.setDiscounted(0);
//                user.setCompletedTraining(0);
//            }
//
//        @Test
//        public void shouldPersistUser() throws RegistrationError
//            {
//                userRepository.save(user);
//                assertTrue(userRepository.userExists(user));
//                assertThat(userRepository.findByUsername(user.getUsername())).isEqualTo(user);
//                assertTrue(userRepository.emailExists(user));
//            }
//
//        @Test
//        public void shouldDeleteUser()
//            {
//                userRepository.deleteUser(user);
//                assertFalse(userRepository.userExists(user));
//                assertFalse(userRepository.emailExists(user));
//            }
//    }
