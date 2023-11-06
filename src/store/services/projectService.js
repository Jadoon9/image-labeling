import { authApiService } from "./authService";

const apiWithTag = authApiService.enhanceEndpoints({
  addTagTypes: ["Project"],
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
    getFromDb: build.query({
      query: () => {
        return {
          url: `/read_local/`,
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
  useGetFromDbQuery,
} = createProjectService;
export default createProjectService;
