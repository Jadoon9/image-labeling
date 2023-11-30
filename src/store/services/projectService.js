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
      // invalidatesTags: ["Project"],
    }),
    updateSession: build.mutation({
      query: (data) => {
        return {
          url: `/update_session/${data.id}/`,
          method: "PUT",
          body: data.data,
        };
      },
    }),
    getProject: build.query({
      query: (id) => {
        return {
          url: `/update_session/${id}/`,
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
      // providesTags: ["Project"],
    }),
    getFromDb: build.query({
      query: () => {
        return {
          url: `/read_local/`,
          method: "GET",
        };
      },
    }),
    getCsv: build.query({
      query: (id) => {
        return {
          url: `/export_data/${id}/`,
          method: "GET",
        };
      },
    }),
    deleteProject: build.mutation({
      query: (id) => {
        return {
          url: `/project/${id}/`,
          method: "DELETE",
        };
      },
    }),
    deleteSession: build.mutation({
      query: (id) => {
        return {
          url: `/destroy_session/${id}/`,
          method: "DELETE",
        };
      },
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
  useDeleteProjectMutation,
  useDeleteSessionMutation,
} = createProjectService;
export default createProjectService;
