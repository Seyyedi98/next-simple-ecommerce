import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/db/db";
import React from "react";

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaid: true },
    _count: true,
  });

  // await wait(2000);

  return {
    amount: data._sum.pricePaid || 0,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  // Putting them in promise make them happen in sametime together
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaid: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({
      where: { isAvailableForPurchase: true },
    }),
    prisma.product.count({
      where: { isAvailableForPurchase: false },
    }),
  ]);
  return { activeCount, inactiveCount };
}

export default async function Dashboard() {
  // const salesData = await getSalesData();
  // const userData = await getUserData();

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${salesData.numberOfSales} Orders`}
        body={`$${salesData.amount}`}
      />
      <DashboardCard
        title="Cutomer"
        subtitle={`${userData.averageValuePerUser} Average Value`}
        body={`${userData.userCount}`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${productData.inactiveCount} Inactive`}
        body={`${productData.activeCount}`}
      />
    </div>
  );
}

function DashboardCard({ title, subtitle, body }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
