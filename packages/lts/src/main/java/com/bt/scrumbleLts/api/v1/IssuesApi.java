package com.bt.scrumbleLts.api.v1;

import com.blade.mvc.RouteContext;
import com.blade.mvc.annotation.*;
import com.bt.scrumbleLts.dto.Issue;
import com.bt.scrumbleLts.dto.Sprint;
import com.bt.scrumbleLts.dto.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@Path
public class IssuesApi {

    private final Sprint sprint = new Sprint(1, "Requirement Gathering", "",
            "open", LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
            Map.of("1", 1,"2", 2));

    private Issue[] getSeedDataProject1() {
        return new Issue[] {
                new Issue(1, 1, "Issue #1", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(2, 1, "Issue #2", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(3, 1, "Issue #3", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(4, 1, "Issue #4", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(5, 1, "Issue #5", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
        };
    }

    private Issue[] getSeedDataProject2() {
        return new Issue[] {
                new Issue(1, 2, "Issue #1", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(2, 2, "Issue #2", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(3, 2, "Issue #3", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(4, 2, "Issue #4", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
                new Issue(5, 2, "Issue #5", "", new User(), new User(), "opened", sprint, new ArrayList<>(), LocalDateTime.now().toString()),
        };
    }

    @JSON
    @GetRoute("/projects/:projectId/issues")
    public Issue[] getIssues(RouteContext ctx, @PathParam Integer projectId, @Param String state,
                             @Param String scope, @Param String labels, @Param String search, @Param Integer page) {
        // For filter, state=opened/closed, scope=all, labels=unplanned
        // Search is search term, match to description and title only
        System.out.println(projectId);
        if (projectId != 5) {
            ctx.header("Link", String.format("[<http://localhost:8001/projects/%d/issues?id=%d&page=%d&search=%s&state=%s>; rel=\"next\"",
                    projectId, projectId + 1, page, search, state));
        }
        if (projectId == 1) {
            return getSeedDataProject1();
        } else {
            return getSeedDataProject2();
        }
    }

//    https://gitlab.ryanchristian.dev/api/v4/projects/12/issues?state=opened&search=&page=1&access_token=1357823395c77376a438721591fa2560c13ac370f7d2be4d5d30855153c1a273
//    https://gitlab.ryanchristian.dev/api/v4/projects/9/issues?state=opened&search=&page=1&access_token=1357823395c77376a438721591fa2560c13ac370f7d2be4d5d30855153c1a273
//    https://gitlab.ryanchristian.dev/api/v4/projects/1/issues?state=opened&search=&page=1&access_token=1357823395c77376a438721591fa2560c13ac370f7d2be4d5d30855153c1a273

//    Link=[
//            <http://10.72.98.102/api/v4/projects/8/issues?access_token=45239db413b905436f82383a99202d9c2ebba5aa7e608b4832d46a96b89486bd&id=8&
//                  order_by=created_at&page=2&per_page=20&search=&sort=desc&state=opened&with_labels_details=false>; rel="next",
//    ],
}
