
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Search, Database, MessageSquare, Code, Table as TableIcon, LineChart } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface DatabaseTable {
  name: string;
  rowCount: number;
}

interface DatabaseBrowserProps {
  tables: DatabaseTable[];
  onSelectTable: (tableName: string) => void;
}

const DatabaseBrowser: React.FC<DatabaseBrowserProps> = ({ tables, onSelectTable }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('natural');
  const [queryInput, setQueryInput] = useState('');
  const [results, setResults] = useState<any[] | null>(null);

  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunQuery = () => {
    // Mock data for demonstration
    setResults([
      { customer_id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', address: '123 Main St', created_at: '2023-01-15 09:30:00' },
      { customer_id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave', created_at: '2023-01-16 14:20:00' },
      { customer_id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', address: '789 Pine Rd', created_at: '2023-01-17 11:45:00' },
      { customer_id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '555-3456', address: '101 Elm St', created_at: '2023-01-18 16:10:00' },
      { customer_id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-7890', address: '202 Maple Dr', created_at: '2023-01-19 10:05:00' }
    ]);
  };

  const handleNaturalLanguageQuery = () => {
    // Simulate the AI processing
    setResults([
      { customer_id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', address: '123 Main St', created_at: '2023-01-15 09:30:00' },
      { customer_id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave', created_at: '2023-01-16 14:20:00' }
    ]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left panel - Tables browser */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="bg-gray-800 border-gray-700 h-full">
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search tables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Tables
              </h3>
              
              <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredTables.map((table) => (
                  <div
                    key={table.name}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-gray-700 cursor-pointer"
                    onClick={() => onSelectTable(table.name)}
                  >
                    <div className="flex items-center">
                      <TableIcon className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-200">{table.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{table.rowCount} rows</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Right panel - Query interface */}
        <div className="flex-1">
          <Card className="bg-gray-800 border-gray-700 h-full">
            <div className="p-4 flex flex-col h-full">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="bg-gray-700 mb-4">
                  <TabsTrigger value="natural" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Natural Language
                  </TabsTrigger>
                  <TabsTrigger value="sql" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    <Code className="h-4 w-4 mr-2" />
                    SQL Query
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="natural" className="mt-0">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask a question about your data in plain English..."
                      className="min-h-[60px] bg-gray-700 border-gray-600 text-white flex-1"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                    />
                    <Button 
                      className="bg-primary hover:bg-primary/90" 
                      onClick={handleNaturalLanguageQuery}
                    >
                      Submit
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="sql" className="mt-0">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Write your SQL query here..."
                      className="min-h-[60px] bg-gray-700 border-gray-600 text-white flex-1 font-mono"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                    />
                    <Button 
                      className="bg-primary hover:bg-primary/90" 
                      onClick={handleRunQuery}
                    >
                      Run
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              {results && (
                <div className="mt-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700 text-gray-200">
                        <TableIcon className="h-4 w-4 mr-2" />
                        Table
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700 text-gray-200">
                        <LineChart className="h-4 w-4 mr-2" />
                        Chart
                      </Button>
                    </div>
                    <span className="text-sm text-gray-400">{results.length} results</span>
                  </div>
                  
                  <div className="flex-1 overflow-auto rounded border border-gray-700">
                    <Table>
                      <TableHeader>
                        {results.length > 0 && (
                          <TableRow className="bg-gray-700/50 hover:bg-gray-700/50">
                            {Object.keys(results[0]).map((key) => (
                              <TableHead key={key} className="text-gray-300">
                                {key}
                              </TableHead>
                            ))}
                          </TableRow>
                        )}
                      </TableHeader>
                      <TableBody>
                        {results.map((row, i) => (
                          <TableRow key={i} className="border-gray-700 hover:bg-gray-700/30">
                            {Object.values(row).map((value: any, j) => (
                              <TableCell key={j} className="text-gray-300">
                                {value}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatabaseBrowser;
