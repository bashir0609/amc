"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Car, Calendar, Gauge, FileText, CheckCircle2, XCircle } from "lucide-react";
import { MOTHistoryResponse } from "@/lib/mot-api";

export default function CheckMotStatusPage() {
  const [vrm, setVrm] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [motData, setMotData] = useState<MOTHistoryResponse | null>(null);

  const handleFetchHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vrm) return;

    setIsFetching(true);
    setError("");
    setMotData(null);

    try {
      const res = await fetch(`/api/mot-history?vrm=${encodeURIComponent(vrm)}`);
      if (!res.ok) {
        setError("Vehicle not found. Please check your registration and try again.");
        return;
      }
      const data = await res.json();
      setMotData(data);
    } catch {
      setError("An error occurred while fetching the MOT history. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const toTitleCase = (str?: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Check if MOT is valid by comparing the latest expiry date
  const isMotValid = () => {
    if (!motData || !motData.motTests || motData.motTests.length === 0) return false;
    // DVSA typically returns the most recent test first, find first PASS with an expiry
    const latestTest = motData.motTests.find(t => t.testResult === 'PASSED');
    if (!latestTest || !latestTest.expiryDate) return false;
    
    // expiry parts [YYYY, MM, DD]
    const parts = latestTest.expiryDate.split('.');
    if (parts.length === 3) {
       const expiryDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
       return expiryDate > new Date();
    }
    return false;
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gray-50">
        
        {/* Dynamic Hero Section */}
        <div className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50" />
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')" }}
            />
            {/* Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex flex-col items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                DVSA Integrated Check
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Check MOT Status & History
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10">
                Instantly view your vehicle&apos;s complete MOT history, mileage records, and current expiry date. 100% Free.
              </p>

              {/* Search Form */}
              <form id="check-mot-status-form" onSubmit={handleFetchHistory} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={vrm}
                    onChange={(e) => setVrm(e.target.value.toUpperCase())}
                    placeholder="ENTER REGISTRATION (e.g. AB12CDE)"
                    className="w-full pl-6 sm:pl-16 pr-4 py-4 text-lg font-bold text-center sm:text-left text-gray-900 bg-white border-2 border-transparent rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 uppercase placeholder:text-gray-400 placeholder:font-normal placeholder:lowercase transition-all shadow-xl"
                    required
                  />
                  {/* UK License Plate Stylistic Touch */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-blue-700 rounded-l-lg flex flex-col items-center justify-center border-r-2 border-blue-800 opacity-90 hidden sm:flex">
                     <span className="text-white font-bold text-xs">UK</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isFetching || !vrm}
                  className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-xl shadow-primary-500/30 flex items-center justify-center"
                >
                  {isFetching ? "Searching..." : <><Search className="w-5 h-5 mr-2" /> Check History</>}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-lg max-w-2xl mx-auto backdrop-blur-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {motData && (
          <div className="container-custom py-16">
            <div className="max-w-5xl mx-auto space-y-8">
              
              {/* Trap Door Top CTA */}
              <div className="text-center bg-white p-6 rounded-2xl border-2 border-primary-100 shadow-lg mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                   <h3 className="text-2xl font-bold font-heading text-gray-900 mb-1">
                      {isMotValid() ? "Has your MOT expired, or failing soon?" : "Your MOT has expired or you need a renewal!"}
                   </h3>
                   <p className="text-gray-600">Secure your slot today. Walk-ins welcome, but booking avoids the wait.</p>
                </div>
                <Link href={`/mot-booking?vrm=${motData.registration}`} className="btn-primary whitespace-nowrap px-8 py-4 text-lg shadow-xl shrink-0">
                   Book Your MOT Now
                </Link>
              </div>

              {/* Vehicle Summary Card */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-xl font-heading font-bold flex items-center text-gray-900">
                    <Car className="w-6 h-6 mr-2 text-primary-600" />
                    Vehicle Details
                  </h2>
                  <div className="px-4 py-1.5 bg-yellow-400 text-black font-bold rounded shadow-sm text-lg track-wider">
                     {motData.registration}
                  </div>
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Make</p>
                    <p className="font-semibold text-lg text-gray-900">{toTitleCase(motData.make)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Model</p>
                    <p className="font-semibold text-lg text-gray-900">{toTitleCase(motData.model)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Colour</p>
                    <p className="font-semibold text-lg text-gray-900">{toTitleCase(motData.primaryColour)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
                    <p className="font-semibold text-lg text-gray-900">{toTitleCase(motData.fuelType)}</p>
                  </div>
                  {motData.manufactureDate && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Year of Manufacture</p>
                      <p className="font-semibold text-lg text-gray-900">{motData.manufactureDate.split('.')[0]}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* MOT History Timeline */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                 <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-heading font-bold flex items-center text-gray-900">
                    <FileText className="w-6 h-6 mr-2 text-primary-600" />
                    Detailed MOT History
                  </h2>
                </div>
                <div className="p-6">
                  {motData.motTests && motData.motTests.length > 0 ? (
                    <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                       {motData.motTests.map((test, idx) => {
                          const isPass = test.testResult === 'PASSED';
                          
                          // Convert DVSA YYYY.MM.DD to readable
                          const formatDate = (dateString?: string) => {
                             if (!dateString) return "N/A";
                             const parts = dateString.split('.');
                             if (parts.length === 3) {
                               const date = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
                               return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                             }
                             return dateString;
                          };

                          return (
                            <div key={idx} className="relative pl-8">
                              {/* Timeline dot */}
                              <div className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center ${isPass ? 'bg-green-500' : 'bg-red-500'}`}>
                                 {isPass ? <CheckCircle2 className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
                              </div>

                              <div className={`p-5 rounded-xl border ${isPass ? 'border-green-100 bg-green-50/30' : 'border-red-100 bg-red-50/30'}`}>
                                 <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                                    <div>
                                       <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold mb-3 ${isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                          {isPass ? 'PASS' : 'FAIL'}
                                       </span>
                                       <h4 className="font-bold text-gray-900 text-lg">
                                          Test Date: {formatDate(test.completedDate)}
                                       </h4>
                                    </div>
                                    
                                    <div className="flex gap-4 items-center bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                                      <div className="flex items-center text-gray-600">
                                         <Gauge className="w-5 h-5 mr-2 text-gray-400" />
                                         <span className="font-semibold text-gray-900">{test.odometerValue}</span> 
                                         <span className="ml-1 text-sm">{test.odometerUnit}</span>
                                      </div>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-gray-200 border-opacity-50">
                                    {test.expiryDate && (
                                      <div>
                                        <span className="text-gray-500 flex items-center mb-1">
                                          <Calendar className="w-4 h-4 mr-1" /> Expiry Date
                                        </span>
                                        <span className="font-semibold text-gray-900">{formatDate(test.expiryDate)}</span>
                                      </div>
                                    )}
                                    <div>
                                       <span className="text-gray-500 block mb-1">MOT Test Number</span>
                                       <span className="font-mono text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">{test.motTestNumber}</span>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          );
                       })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-10">
                      No MOT history records found for this vehicle. It may be too new (under 3 years old).
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="text-center bg-gray-900 text-white p-10 rounded-2xl shadow-xl mt-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                   <h2 className="text-3xl font-heading font-bold mb-4">Ready to test your {toTitleCase(motData?.make)}?</h2>
                   <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                     Whether you need a full service, repairs, or just your annual MOT, Auto MOT Centre guarantees DVSA certified, honest work.
                   </p>
                   <Link href={`/mot-booking?vrm=${motData.registration}`} className="btn-primary text-xl px-10 py-5 shadow-2xl hover:scale-105 transform transition-all duration-300 inline-block">
                     Book Your MOT Instantly
                   </Link>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
