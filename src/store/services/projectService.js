import { authApiService } from "./authService";

const createProjectService = authApiService.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (data) => {
        return {
          url: "/project/",
          method: "POST",
          body: data,
        };
      },
    }),
    getProject: build.query({
      query: (id) => {
        return {
          url: `/project/${id}/`,
          method: "GET",
        };
      },
    }),
    getProjectsList: build.query({
      query: () => {
        return {
          url: `/project/`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetProjectsListQuery,
} = createProjectService;
export default createProjectService;
