import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { agentId } = await params;

  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
      userId: session.user.id,
    },
  });

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  return NextResponse.json(agent);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { agentId } = await params;
  const body = await request.json();

  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
      userId: session.user.id,
    },
  });

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const updated = await prisma.agent.update({
    where: { id: agentId },
    data: {
      name: body.name,
      signalType: body.signalType,
      interactionTypes: body.interactionTypes,
      keywords: body.keywords,
    },
  });

  return NextResponse.json(updated);
}