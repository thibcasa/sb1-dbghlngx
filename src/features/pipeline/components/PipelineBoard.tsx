import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Settings, Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';
import type { PipelineStage, ContactInPipeline } from '../types';

interface PipelineBoardProps {
  stages: PipelineStage[];
  contacts: ContactInPipeline[];
  onContactMove: (contactId: string, fromStage: string, toStage: string) => Promise<void>;
  onStageSettingsClick: (stage: PipelineStage) => void;
}

export function PipelineBoard({
  stages,
  contacts,
  onContactMove,
  onStageSettingsClick
}: PipelineBoardProps) {
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const sourceStage = result.source.droppableId;
    const destinationStage = result.destination.droppableId;
    const contactId = result.draggableId;

    if (sourceStage !== destinationStage) {
      await onContactMove(contactId, sourceStage, destinationStage);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {stages.map(stage => (
          <div key={stage.id} className="flex-1 min-w-[320px]">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{stage.name}</h3>
                  <Badge variant="primary">
                    {contacts.filter(c => c.stageId === stage.id).length}
                  </Badge>
                </div>
                <button
                  onClick={() => onStageSettingsClick(stage)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 min-h-[200px]"
                  >
                    {contacts
                      .filter(contact => contact.stageId === stage.id)
                      .map((contact, index) => (
                        <Draggable
                          key={contact.id}
                          draggableId={contact.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {contact.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {contact.email}
                                  </p>
                                </div>
                                <Badge variant={contact.status}>
                                  {contact.status}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </div>
        ))}

        <div className="flex-shrink-0 w-[320px]">
          <Button
            variant="outline"
            className="w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-2"
          >
            <Plus className="w-6 h-6" />
            Ajouter une étape
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
}