//package com.nsa.cubric.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import ScrumbleAPI;
//import RegistrationError;
//import User;
//import IUserService;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.Mockito.doThrow;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//@AutoConfigureMockMvc
//public class UserControllerTest
//    {
//        @Autowired
//        MockMvc mockMvc;
//
//        @MockBean
//        IUserService userService;
//
//        private User user;
//
//        @Before
//        public void setUp()
//            {
//                user = new User();
//            }
//
//        @Test
//        public void shouldReturnRegistrationForm() throws Exception
//            {
//                this.mockMvc
//                        .perform(get("/registration"))
//                        .andExpect(status()
//                                .isOk())
//                        .andExpect(view().name("registration"));
//            }
////
////        @Test
////        @WithMockUser(roles = "USER")
////        public void shouldProcessCorrectRegistrationData() throws Exception
////            {
////
////                this.mockMvc
////                        .perform(post("/registration")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .content(asJsonString(user)))
////                        .andExpect(status().is(302));
////
////            }
//
//        @Test
//        public void shouldHandleRegistrationError() throws Exception
//            {
//                doThrow(RegistrationError.class)
//                        .when(userService)
//                        .validateUser(user);
//
//                this.mockMvc
//                        .perform(post("/registration")
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(asJsonString(user)))
//                        .andExpect(status().isOk())
//                        .andExpect(view().name("registration"));
//
//            }
//
//        @Test
//        @WithMockUser(roles = "USER")
//        public void shouldReturnAccessForbiddenPage() throws Exception
//            {
//                this.mockMvc
//                        .perform(get("/forbidden"))
//                        .andExpect(status()
//                                .isOk())
//                        .andExpect(view().name("forbidden"));
//            }
//
//        public static String asJsonString(final Object obj) {
//            try {
//                final ObjectMapper mapper = new ObjectMapper();
//                final String jsonContent = mapper.writeValueAsString(obj);
//                return jsonContent;
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//        }
//    }
