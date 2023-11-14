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
    updateSession: build.mutation({
      query: (data) => {
        return {
          url: `/update_session/${data.id}/`,
          method: "PUT",
          body: data.data,
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
      providesTags: (result, error, id) => [{ type: "Project", id }],
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
    getCsv: build.query({
      query: (id) => {
        return {
          url: `/update_session/${id}/`,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),
    addSession: build.mutation({
      query: (data) => {
        return {
          url: "/create_session/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetProjectsListQuery,
  useGetFromDbQuery,
  useGetCsvQuery,
  useAddSessionMutation,
  useUpdateSessionMutation,
} = createProjectService;
export default createProjectService;
