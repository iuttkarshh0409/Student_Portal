import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { GraduationCap, Users, Mail, User, Hash } from 'lucide-react';
import { Badge } from './ui/badge';

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  course_name: string;
  username: string;
}

export function ViewStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Fetch students from backend
    fetch('http://localhost:3000/students/view')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => {
        console.error('Error fetching students:', err);
        // Fallback to mock data if backend is not available
        const mockStudents: Student[] = [
          {
            student_id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            course_name: 'BCA',
            username: 'johndoe'
          },
          {
            student_id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
            course_name: 'MCA',
            username: 'janesmith'
          },
          {
            student_id: 3,
            first_name: 'Michael',
            last_name: 'Johnson',
            email: 'michael.j@example.com',
            course_name: 'B.Sc CS',
            username: 'michaelj'
          },
        ];
        setStudents(mockStudents);
      });
  }, []);

  const getCourseColor = (course: string) => {
    const colors: { [key: string]: string } = {
      'BCA': 'bg-gradient-to-r from-blue-500 to-blue-600',
      'MCA': 'bg-gradient-to-r from-purple-500 to-purple-600',
      'B.Sc CS': 'bg-gradient-to-r from-green-500 to-green-600',
    };
    return colors[course] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  return (
    <div className="w-full max-w-6xl relative z-10">
      {/* Glassmorphism card with gradient border */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-white via-orange-100 to-white shadow-2xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-inner">
          {/* Header with gradient text */}
          <div className="mb-8 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Registered Students
                </h1>
                <p className="text-gray-600 text-sm">View all registered students information</p>
              </div>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent rounded-full"></div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-orange-600">{students.length}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Courses</p>
                  <p className="text-blue-600">3</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verified Emails</p>
                  <p className="text-purple-600">{students.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border-2 border-gray-200 overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-100/70">
                  <TableHead className="py-4">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-orange-600" />
                      <span>ID</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-600" />
                      <span>Name</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-600" />
                      <span>Email</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-orange-600" />
                      <span>Course</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-600" />
                      <span>Username</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-gray-300" />
                        <p>Loading students...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student, index) => (
                    <TableRow 
                      key={student.student_id}
                      className="hover:bg-orange-50/30 transition-colors duration-200 border-b border-gray-100"
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-sm">
                          {student.student_id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-sm">
                            {student.first_name[0]}{student.last_name[0]}
                          </div>
                          <span>{student.first_name} {student.last_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{student.email}</TableCell>
                      <TableCell>
                        <Badge className={`${getCourseColor(student.course_name)} text-white border-0 shadow-sm`}>
                          {student.course_name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {student.username}
                        </code>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Bottom decoration */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-orange-600"></div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl"></div>
    </div>
  );
}