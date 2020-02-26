//package com.nsa.cubric.controller.api;
//
//import ScrumbleAPI;
//import DataAnalysisRepository;
//import UsageService;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.jdbc.AutoConfigureDataJdbc;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.HashMap;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@DirtiesContext
//@ContextConfiguration(classes = ScrumbleAPI.class)
//@RunWith(SpringRunner.class)
//@SpringBootTest()
//@AutoConfigureMockMvc
//@ActiveProfiles("dev")
//@AutoConfigureDataJdbc
//public class UsageApiTest
//    {
//        @Autowired
//        MockMvc mockMvc;
//
//        @MockBean
//        UsageService usageService;
//
//        @MockBean
//        DataAnalysisRepository repository;
//
//        private HashMap<String, Double> answerRatios;
//
//        private HashMap<String, Integer> trainingStats;
//
//        private HashMap<String, Integer> outliersAndUsefulUsers;
//
//        @Before
//        public void initializeAnswerRatios()
//            {
//                answerRatios = new HashMap<>();
//                answerRatios.put("percentageOfCorrectAnswers", 80.00);
//                answerRatios.put("percentageOfIncorrectAnswers", 20.00);
//            }
//
//        @Before
//        public void initializeOutliersAndUsefulUsers()
//            {
//                outliersAndUsefulUsers = new HashMap<>();
//                outliersAndUsefulUsers.put("totalActiveUsers", 80);
//                outliersAndUsefulUsers.put("totalOutliers", 20);
//            }
//
//        @Before
//        public void initializeTrainingStats()
//            {
//                trainingStats = new HashMap<>();
//                trainingStats.put("completedTraining", 80);
//                trainingStats.put("notCompletedTraining", 20);
//            }
//
//        @Test
//        @WithMockUser(roles = "ADMIN")
//        public void shouldReturnAnswersRatio() throws Exception
//            {
//                given(usageService.getRatios()).willReturn(answerRatios);
//                given(repository.RatioOfCorrectAndIncorrectAnswers()).willReturn(answerRatios);
//
//                this.mockMvc.perform(get("/api/usageData/answersRatio")
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andDo(print())
//                        .andExpect(status().isOk())
//                        .andExpect(jsonPath("$.percentageOfCorrectAnswers")
//                                .value(answerRatios.get("percentageOfCorrectAnswers")))
//                        .andExpect(jsonPath("$.percentageOfIncorrectAnswers")
//                                .value(answerRatios.get("percentageOfIncorrectAnswers")));
//            }
//
//        @Test
//        @WithMockUser(roles = "ADMIN")
//        public void shouldReturnTrainingStats() throws Exception
//            {
//                given(usageService.trainingCompletion()).willReturn(trainingStats);
//                given(repository.trainingCompletion()).willReturn(trainingStats);
//
//                this.mockMvc.perform(get("/api/usageData/trainingStats")
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andDo(print())
//                        .andExpect(status().isOk())
//                        .andExpect(jsonPath("$.completedTraining")
//                                .value(trainingStats.get("completedTraining")))
//                        .andExpect(jsonPath("$.notCompletedTraining")
//                                .value(trainingStats.get("notCompletedTraining")));
//            }
//
//        @Test
//        @WithMockUser(roles = "ADMIN")
//        public void shouldReturnNumberOfOutliersAndUsefulUsers() throws Exception
//            {
//                given(usageService.getOutliers()).willReturn(outliersAndUsefulUsers);
//                given(repository.outliersAndGoodUsers()).willReturn(outliersAndUsefulUsers);
//
//                this.mockMvc.perform(get("/api/usageData/outliers")
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andDo(print())
//                        .andExpect(status().isOk())
//                        .andExpect(jsonPath("$.totalOutliers")
//                                .value(outliersAndUsefulUsers.get("totalOutliers")))
//                        .andExpect(jsonPath("$.totalActiveUsers")
//                                .value(outliersAndUsefulUsers.get("totalActiveUsers")));
//            }
//    }
