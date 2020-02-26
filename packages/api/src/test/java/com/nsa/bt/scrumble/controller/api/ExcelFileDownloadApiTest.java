//package com.nsa.cubric.controller.api;
//
//import ScrumbleAPI;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.jdbc.AutoConfigureDataJdbc;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.nio.file.Paths;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//@AutoConfigureMockMvc
//@ActiveProfiles("dev")
//@AutoConfigureDataJdbc
//public class ExcelFileDownloadApiTest
//    {
//
//        @Autowired
//        MockMvc mockMvc;
//
//        @Test
//        @WithMockUser(roles = "ADMIN")
//        public void shouldReturnFilePathOfCreatedExcelFile() throws Exception
//            {
//                this.mockMvc.perform(get("/admin/api/swipes/excel")
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andExpect(status().isOk())
//                        .andDo(mvcResult -> {
//                            assertThat(mvcResult.getResponse()
//                                    .getHeader("excelFilePath"))
//                                    .isEqualTo(Paths.get("/excel/swipe_data.xlsx").toString());
//                        });
//            }
//    }
