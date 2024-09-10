import { deleteUser } from "@/lib/database/user.actions";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();

    const response = await deleteUser(identifier as string);

    if (!response.success) {
      return Response.json({
        success: false,
        message: response.message,
      });
    }

    return Response.json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "somthing went wrong",
    });
  }
}
