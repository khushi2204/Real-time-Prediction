import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as React from 'react';

export function CardWithForm() {
  const [userInput, setUserInput] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [data, setData] = React.useState<any>(null);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setMessage('Data fetched successfully!');
    } catch (error) {
      setMessage('Error fetching data. Please try again.');
      setData(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInput || !category) {
      alert('Please enter a value and select a category.');
      return;
    }

    switch (category) {
      case 'weather':
        fetchData(`/api/weather?city=${userInput}`);
        break;
      case 'crypto':
        fetchData(`/api/crypto?symbol=${userInput}`);
        break;
      case 'news':
        fetchData(`/api/news?query=${userInput}`);
        break;
      default:
        setMessage('Invalid category selected.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] bg-white shadow-xl">
        <CardHeader>
          <CardTitle>Data Fetcher</CardTitle>
          <CardDescription>Enter a term and choose a category to fetch relevant data.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userInput">Enter Term</Label>
              <Input
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter a city, cryptocurrency, or topic"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Select Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger id="category" className="mt-2">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CardFooter className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => { setUserInput(''); setCategory(''); setMessage(''); setData(null); }}>Cancel</Button>
              <Button type="submit">Fetch Data</Button>
            </CardFooter>
          </form>

          {message && <p className="mt-4 text-blue-600 font-semibold">{message}</p>}

          {data && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CardWithForm;
