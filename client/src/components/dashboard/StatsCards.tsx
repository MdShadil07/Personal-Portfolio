import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity, Users, DollarSign, CreditCard } from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1% from last month",
        icon: DollarSign,
        trend: "up",
    },
    {
        title: "Subscriptions",
        value: "+2350",
        change: "+180.1% from last month",
        icon: Users,
        trend: "up",
    },
    {
        title: "Sales",
        value: "+12,234",
        change: "+19% from last month",
        icon: CreditCard,
        trend: "up",
    },
    {
        title: "Active Now",
        value: "+573",
        change: "+201 since last hour",
        icon: Activity,
        trend: "up",
    },
];

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {stat.trend === "up" ? (
                                <ArrowUpRight className="h-3 w-3 text-green-500" />
                            ) : (
                                <ArrowDownRight className="h-3 w-3 text-red-500" />
                            )}
                            <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                                {stat.change}
                            </span>
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
