import { authApiService } from "./authService";

const apiWithTag = authApiService.enhanceEndpoints({
  addTagTypes: ["Employee"],
});

const createProjectService = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (data) => {
        return {
          url: "/project/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Project"],
    }),
    getProject: build.query({
      query: (id) => {
        return {
          url: `/project/${id}/`,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),
    getProjectsList: build.query({
      query: () => {
        return {
          url: `/project/`,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetProjectsListQuery,
} = createProjectService;
export default createProjectService;
