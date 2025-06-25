"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Users,
  Calendar,
  
  Clock,
  Search,
  Filter,
  Eye,
  MessageCircle,
  CheckCircle,
  X,
} from "lucide-react";
import submissions from "@/data/submission.json";

type Submission = {
  id: number;
  name: string;
  category: string[];
  city: string;
  fee: string;
  submittedAt: string;
  status: string;
};

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Stats
  const stats = [
    {
      title: "Total Submissions",
      value: submissions.length,
      icon: Users,
      change: "+12%",
      changeColor: "text-green-600",
    },
    {
      title: "Pending Review",
      value: submissions.filter((s) => s.status === "pending").length,
      icon: Clock,
      change: "-5%",
      changeColor: "text-red-600",
    },
    {
      title: "Approved Artists",
      value: submissions.filter((s) => s.status === "approved").length,
      icon: CheckCircle,
      change: "+18%",
      changeColor: "text-green-600",
    },
    {
      title: "This Month",
      value: submissions.length,
      icon: Calendar,
      change: "+23%",
      changeColor: "text-green-600",
    },
  ];

  // Filter submissions
  const filteredSubmissions = submissions.filter((submission: Submission) => {
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.category.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleStatusChange = (
    submissionId: number,
    newStatus: "approved" | "rejected"
  ) => {
    // In a real app, this would make an API call
    console.log(
      `Changing status of submission ${submissionId} to ${newStatus}`
    );
    // Update the submission status in your state management
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Manager Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Manage artist submissions and track your platform performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.changeColor}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Artist Submissions</CardTitle>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-[200px]"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artist Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Categories
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Fee Range
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Submitted
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground">
                      No submissions found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission: Submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {submission.category.slice(0, 2).map((cat) => (
                            <Badge
                              key={cat}
                              variant="secondary"
                              className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                          {submission.category.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{submission.category.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {submission.city}
                      </TableCell>

                      <TableCell className="hidden lg:table-cell font-medium">
                        {submission.fee}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {formatDate(submission.submittedAt)}
                      </TableCell>

                      <TableCell>{getStatusBadge(submission.status)}</TableCell>

                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>

                          {submission.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() =>
                                  handleStatusChange(submission.id, "approved")
                                }>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() =>
                                  handleStatusChange(submission.id, "rejected")
                                }>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
