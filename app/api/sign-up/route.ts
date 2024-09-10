import { createUser } from "@/lib/database/user.actions";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, email, password, firstname, lastname } =
      await request.json();

    const hasPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      email,
      password: hasPassword,
      firstname,
      lastname,
    };

    const newUser = await createUser(user);

    if (!newUser) {
      return Response.json(
        {
          success: false,
          message: newUser.message,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: newUser.message,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "somthing went wrong",
      },
      { status: 500 }
    );
  }
}
