"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  CalendarIcon,
  ShieldIcon,
  LoaderIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import StatisticsCard from "@/components/shadcn-studio/blocks/statistics-card-01";

export default function UserDataPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "+1 (555) 123-4567",
    address: "123 Banking Street, New York, NY 10001",
    dateOfBirth: "1990-05-15",
    accountNumber: "******3278",
    customerId: "CUST-123456",
    memberSince: "January 2024",
    image: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/protected/user`,
          { withCredentials: true }
        );

        const c = data.user.clerk;
        const d = data.user.db;

        setProfile({
          name: `${c.firstName} ${c.lastName}`,
          email: c.email,
          phone: profile.phone,
          address: profile.address,
          dateOfBirth: profile.dateOfBirth,
          accountNumber: profile.accountNumber,
          customerId: "XXXX",
          memberSince: new Date(d.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          image: c.image,
        });
      } catch (err) {
        console.error("Failed fetching backend user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const statisticsCardData = [
    {
      icon: <UserIcon className="size-4" />,
      value: profile.name || "Loading...",
      title: "Account Holder",
      changePercentage: "Verified",
    },
    {
      icon: <CreditCardIcon className="size-4" />,
      value: profile.accountNumber,
      title: "Account Number",
      changePercentage: "Active",
    },
    {
      icon: <ShieldIcon className="size-4" />,
      value: "Premium",
      title: "Account Type",
      changePercentage: profile.memberSince,
    },
    {
      icon: <CalendarIcon className="size-4" />,
      value: profile.customerId,
      title: "Customer ID",
      changePercentage: "Verified",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="p-6">
      <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">User Data</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and account details
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Statistics Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statisticsCardData.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
              />
            ))}
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your personal details and contact information
                  </CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-24">
                  <AvatarImage src={profile.image} />
                  <AvatarFallback className="text-xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Member since {profile.memberSince}
                  </p>
                  <Badge className="mt-2">Premium Account</Badge>
                </div>
              </div>

              {/* Form Fields */}
              {/* -- same structure as before, unchanged -- */}
              {/* You don’t need me to rewrite the whole UI fields again unless you want cleanup */}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
