//package com.nsa.cubric.controller.api;
//
//        import ScrumbleAPI;
//        import BatchRepository;
//        import ExcelDumpService;
//        import SwipeService;
//        import org.junit.Before;
//        import org.junit.Test;
//        import org.junit.runner.RunWith;
//        import org.springframework.beans.factory.annotation.Autowired;
//        import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureJdbc;
//        import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
//        import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//        import org.springframework.boot.test.context.SpringBootTest;
//        import org.springframework.boot.test.mock.mockito.MockBean;
//        import org.springframework.http.MediaType;
//        import org.springframework.security.test.context.support.WithMockUser;
//        import org.springframework.test.annotation.DirtiesContext;
//        import org.springframework.test.context.ContextConfiguration;
//        import org.springframework.test.context.TestPropertySource;
//        import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//        import org.springframework.test.web.servlet.MockMvc;
//
//        import java.util.ArrayList;
//        import java.util.HashMap;
//        import java.util.List;
//
//        import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
//        import static org.mockito.BDDMockito.given;
//        import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//        import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//        import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest()
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@AutoConfigureMockMvc
//@AutoConfigureJdbc
//public class ImageApiTest
//    {
//        private String username = "loz";
//
//        private HashMap<String, List<String>> imageUriReturn;
//
//        private List<String> filePaths;
//        private List<String> folders;
//
//        @Autowired
//        private MockMvc mockMvc;
//
//        @MockBean
//        private SwipeService swipeService;
//
//
//        @MockBean
//        private BatchRepository batchRepository;
//
//        private String validImageFeedback = "imageUri=images/brain_scans/brain_1&answer=1";
//
//        @Before
//        public void setUp()
//            {
//                filePaths = new ArrayList<>();
//                filePaths.add("/images/brain_scans/brain_4.webp");
//                filePaths.add("/images/brain_scans/brain_1.jpg");
//                filePaths.add("/images/brain_scans/brain_2.jpg");
//                filePaths.add("/images/brain_scans/brain_3.jpg");
//                filePaths.add("/images/brain_scans/brain_5.jpg");
//
//                folders = new ArrayList<>();
//                folders.add("/images/Swipe_R_Jpgs/Jpgs_V1/");
//                folders.add("/images/Swipe_R_Jpgs/Jpgs_V2/");
//                folders.add("/images/Swipe_R_Jpgs/Jpgs_V3/");
//
//                imageUriReturn = new HashMap<>();
//                imageUriReturn.put("folders", folders);
//                imageUriReturn.put("images", filePaths);
//            }
//
//        @Test
//        @WithMockUser(roles = "USER")
//        public void shouldReturnImageBatch() throws Exception
//            {
//                given(swipeService.getRepoBatch(username)).willReturn(imageUriReturn);
//                given(batchRepository.getNewBatch(username)).willReturn(imageUriReturn);
//                given(batchRepository.getBatch("", username)).willReturn(imageUriReturn);
//
//                this.mockMvc.perform(get("/api/images/newBatch")
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andExpect(status().isOk())
////                        .andDo(mvcResult -> {
////                            System.out.println("Content: " + mvcResult.getResponse().getContentAsString());
////                        });
//                        .andExpect(jsonPath("$.folders").value(imageUriReturn.get("folders")))
//                        .andExpect(jsonPath("$.images").value(imageUriReturn.get("images")))
//                        .andDo(print());
//            }
//
//        @Test
//        @WithMockUser(roles = "USER")
//        public void shouldProcessImageFeedback() throws Exception
//            {
//                this.mockMvc
//                        .perform(post("/api/images/answer")
//                                .param("imageUri", "10014A_split_MD_C_trafo_tracts_dRL_FOD_interp_L_SLF_1.jpg")
//                        .param("answer", "1"))
//                        .andExpect(status().is2xxSuccessful());
//            }
//    }
