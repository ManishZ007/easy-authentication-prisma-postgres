import { checkUserAvailable } from "@/lib/database/user.actions";
import { UsernameValidation } from "@/lib/validations/userSchema";
import z from "zod";

const UsernameQuerySchema = z.object({
  username: UsernameValidation,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message:
          usernameErrors.length > 0
            ? usernameErrors.join(", ")
            : "Invalid query params",
      });
    }

    const { username } = result.data;

    const response = await checkUserAvailable(username);

    if (!response) {
      return Response.json(
        {
          success: response.success,
          message: response.message,
        },
        {
          status: 409,
        }
      );
    }

    return Response.json(
      {
        success: response.success,
        message: response.message,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json({
      success: false,
      message: "somthing went wrong",
    });
  }
}
