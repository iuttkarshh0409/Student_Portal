import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Hash, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function UpdateStudent() {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      const res = await fetch(`http://localhost:3000/students/update/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      
      const result = await res.json();

      if (res.ok) {
        setAlert({
          type: 'success',
          message: result.message || `Successfully updated email for student ID ${formData.id}`
        });
        
        // Reset form
        setFormData({ id: '', email: '' });
      } else {
        setAlert({
          type: 'error',
          message: 'Failed to update student email. Please check the student ID and try again.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to connect to the server. Please ensure the backend is running on http://localhost:3000'
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
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Update Student Email
            </h1>
            <p className="text-gray-600">Modify student email address</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student ID */}
            <div className="space-y-2 group">
              <Label htmlFor="studentId" className="flex items-center gap-2 text-gray-700">
                <Hash className="w-4 h-4 text-orange-500" />
                Student ID
              </Label>
              <div className="relative">
                <Input
                  id="studentId"
                  type="number"
                  placeholder="Enter student ID"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white pl-10"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Hash className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-gray-500 pl-1">Enter the unique ID of the student</p>
            </div>

            {/* New Email */}
            <div className="space-y-2 group">
              <Label htmlFor="newEmail" className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-orange-500" />
                New Email Address
              </Label>
              <div className="relative">
                <Input
                  id="newEmail"
                  type="email"
                  placeholder="Enter new email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white pl-10"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-gray-500 pl-1">Provide the updated email address</p>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200/50">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-900">
                    Make sure to verify the student ID before updating. This action will modify the student's email address in the system.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button with Gradient */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mt-8 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Update Email</span>
                </div>
              )}
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