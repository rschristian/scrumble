//package com.nsa.cubric.utils;
//
//import org.junit.Test;
//
//import static org.junit.Assert.assertFalse;
//import static org.junit.Assert.assertTrue;
//
//
//public class UserDetailsValidatorTest
//    {
//        private final String VALID_EMAIL = "user@gmail.com";
//        private final String INVALID_EMAIL = "userGmail.com";
//        private final String INVALID_PC = "0000";
//        private final String VALID_PC = "CF20";
//        private final int INVALID_AGE = 120;
//        private final int VALID_AGE = 20;
//        private final String VALID_PASSWORD = "Password1";
//        private final String INVALID_PASSWORD = "pass";
//        private final String VALID_USERNAME = "user";
//
//
//        @Test
//        public void shouldReturnFalseWhenGivenInvalidEmail()
//            {
//                assertFalse(UserDetailsValidator.isValidEmail(INVALID_EMAIL));
//            }
//
//        @Test
//        public void shouldReturnTrueWhenGivenValidEmail()
//            {
//                assertTrue(UserDetailsValidator.isValidEmail(VALID_EMAIL));
//            }
//
//        @Test
//        public void shouldReturnFalseWhenGivenInvalidPassword()
//            {
//                assertFalse(UserDetailsValidator.isValidPassword(INVALID_PASSWORD));
//            }
//
//        @Test
//        public void shouldReturnTrueWhenGivenValidPassword()
//            {
//                assertTrue(UserDetailsValidator.isValidPassword(VALID_PASSWORD));
//            }
//
//        @Test
//        public void shouldReturnFalseWhenGivenInvalidAge()
//            {
//                assertFalse(UserDetailsValidator.isValidAge(INVALID_AGE));
//            }
//
//        @Test
//        public void shouldReturnTrueWhenGivenValidAge()
//            {
//                assertTrue(UserDetailsValidator.isValidAge(VALID_AGE));
//            }
//
//
//        @Test
//        public void shouldReturnFalseWhenGivenInvalidPostCode()
//            {
//                assertFalse(UserDetailsValidator.isValidFirstHalfOfPostCode(INVALID_PC));
//            }
//
//        @Test
//        public void shouldReturnTrueWhenGivenValidPostCode()
//            {
//                assertTrue(UserDetailsValidator.isValidFirstHalfOfPostCode(VALID_PC));
//            }
//
//        @Test
//        public void shouldReturnTrueWhenGivenValidUsername()
//            {
//                assertTrue(UserDetailsValidator.isValidUsername(VALID_USERNAME));
//            }
//    }
//
//
