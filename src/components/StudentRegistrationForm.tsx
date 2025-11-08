import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, User, Mail, Lock, GraduationCap, UserCircle, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Alert, AlertDescription } from './ui/alert';

export function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: undefined as Date | undefined,
    gender: '',
    username: '',
    password: '',
    course: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      // Map course names to course IDs
      const courseMap: { [key: string]: number } = {
        'bca': 1,
        'mca': 2,
        'bsc-cs': 3,
      };

      // Format date for MySQL (YYYY-MM-DD)
      const formattedDate = formData.dateOfBirth 
        ? format(formData.dateOfBirth, 'yyyy-MM-dd')
        : '';

      const response = await fetch('http://localhost:3000/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          dob: formattedDate,
          gender: formData.gender,
          username: formData.username,
          password: formData.password,
          course: courseMap[formData.course],
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({
          type: 'success',
          message: result.message || 'Student registered successfully!',
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          dateOfBirth: undefined,
          gender: '',
          username: '',
          password: '',
          course: '',
        });
      } else {
        setAlert({
          type: 'error',
          message: 'Failed to register student. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to connect to the server. Please ensure the backend is running on http://localhost:3000',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] relative z-10">
      {/* Glassmorphism card with gradient border */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-white via-orange-100 to-white shadow-2xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-inner">
          {/* Header with gradient text */}
          <div className="mb-8 text-center relative">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Student Registration Form
            </h1>
            <p className="text-gray-600">Fill in this form to register</p>
            <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
          </div>

          {/* Alert Messages */}
          {alert && (
            <div className="mb-6 animate-in slide-in-from-top duration-300">
              <Alert className={`border-2 ${
                alert.type === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                {alert.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <AlertDescription className={
                  alert.type === 'success' ? 'text-green-700' : 'text-red-700'
                }>
                  {alert.message}
                </AlertDescription>
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div className="space-y-2 group">
              <Label htmlFor="firstName" className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-orange-500" />
                First Name
              </Label>
              <div className="relative">
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2 group">
              <Label htmlFor="lastName" className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-orange-500" />
                Last Name
              </Label>
              <div className="relative">
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 group">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-orange-500" />
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <CalendarIcon className="w-4 h-4 text-orange-500" />
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left border-2 border-gray-200 rounded-xl hover:bg-white hover:border-orange-400 transition-all duration-300 bg-gray-50/50 focus:ring-4 focus:ring-orange-100"
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                    {formData.dateOfBirth ? (
                      format(formData.dateOfBirth, 'PPP')
                    ) : (
                      <span className="text-gray-500">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => setFormData({ ...formData, dateOfBirth: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-gray-700">
                <UserCircle className="w-4 h-4 text-orange-500" />
                Gender
              </Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <div className="relative flex items-center justify-center">
                    <RadioGroupItem value="male" id="male" className="border-2 border-orange-500 text-orange-600" />
                  </div>
                  <Label htmlFor="male" className="cursor-pointer flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-300 text-center">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <div className="relative flex items-center justify-center">
                    <RadioGroupItem value="female" id="female" className="border-2 border-orange-500 text-orange-600" />
                  </div>
                  <Label htmlFor="female" className="cursor-pointer flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-300 text-center">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <div className="relative flex items-center justify-center">
                    <RadioGroupItem value="others" id="others" className="border-2 border-orange-500 text-orange-600" />
                  </div>
                  <Label htmlFor="others" className="cursor-pointer flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-300 text-center">
                    Others
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Username */}
            <div className="space-y-2 group">
              <Label htmlFor="username" className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-orange-500" />
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 group">
              <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                <Lock className="w-4 h-4 text-orange-500" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Course */}
            <div className="space-y-2">
              <Label htmlFor="course" className="flex items-center gap-2 text-gray-700">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                Course
              </Label>
              <Select
                value={formData.course}
                onValueChange={(value) => setFormData({ ...formData, course: value })}
              >
                <SelectTrigger className="w-full rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                  <SelectItem value="bsc-cs">B.Sc CS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button with Gradient */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mt-8 py-6 bg-[length:200%_100%] hover:bg-right disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: 'left',
              }}
            >
              {isLoading ? 'Registering...' : 'Register Now'}
            </Button>
          </form>

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