import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Link } from 'wouter';
import { CurrencyFormatter } from '@/utils/formatting';
import type { PricingPlan } from '@/types';

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
  onSelect?: (plan: PricingPlan) => void;
  showSelectButton?: boolean;
}

export function PricingCard({ 
  plan, 
  className,
  onSelect,
  showSelectButton = true 
}: PricingCardProps) {
  const hasDiscount = plan.originalPrice && plan.originalPrice > plan.price;
  const discountInfo = hasDiscount 
    ? CurrencyFormatter.formatWithDiscount(plan.originalPrice!, plan.price)
    : null;

  const handleSelect = () => {
    onSelect?.(plan);
  };

  return (
    <Card className={`relative ${plan.isPopular ? 'border-orange-500 shadow-lg' : ''} ${className}`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-orange-500 text-white px-4 py-1">
            ยอดนิยม
          </Badge>
        </div>
      )}
      
      {plan.isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white px-4 py-1">
            แนะนำ
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          {plan.name}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {plan.duration}
        </CardDescription>
        
        <div className="mt-4">
          {hasDiscount && discountInfo && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-lg text-gray-500 line-through">
                {discountInfo.original}
              </span>
              <Badge variant="destructive" className="text-xs">
                -{discountInfo.percentage}%
              </Badge>
            </div>
          )}
          
          <div className="text-3xl font-bold text-blue-600">
            {CurrencyFormatter.formatTHB(plan.price)}
          </div>
          
          {hasDiscount && discountInfo && (
            <div className="text-sm text-green-600 font-medium">
              ประหยัด {discountInfo.savings}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {showSelectButton && (
          <div className="pt-4">
            {onSelect ? (
              <Button 
                onClick={handleSelect}
                className={`w-full ${
                  plan.isPopular || plan.isRecommended 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : ''
                }`}
              >
                เลือกแพลนนี้
              </Button>
            ) : (
              <Link href={`/checkout?plan=${plan.id}`}>
                <Button 
                  className={`w-full ${
                    plan.isPopular || plan.isRecommended 
                      ? 'bg-orange-500 hover:bg-orange-600' 
                      : ''
                  }`}
                >
                  เลือกแพลนนี้
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}