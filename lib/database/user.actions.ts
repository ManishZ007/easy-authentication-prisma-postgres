import prisma from "./config/prisma";

export const createUser = async (user: CreateUserProps) => {
  try {
    const response = await prisma.users.create({
      data: user,
    });

    if (!response) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "user not created",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user created successfully",
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const checkUserAvailable = async (username: string) => {
  try {
    const response = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (response) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "username already taken",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "username is available",
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const loginUser = async (identifier: string) => {
  try {
    const response = await prisma.users.findFirst({
      where: {
        OR: [
          { email: { contains: identifier } },
          { username: { contains: identifier } },
        ],
      },
    });

    if (!response) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "user not found",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user found successfully",
        user: response,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const updateUser = async (user: UpdateUserProps) => {
  try {
    const response = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        username: user.username,
      },
    });

    if (!response) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "user not update",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user update successfully",
        updateUser: response,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const deleteUser = async (identifier: string) => {
  try {
    const response = await prisma.users.delete({
      where: {
        id: identifier,
      },
    });

    if (!response) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "user not delete try again letter",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user deleted successfully",
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: { contains: email },
      },
    });

    if (!user) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "use not found",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user found successfully",
        data: user,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};
