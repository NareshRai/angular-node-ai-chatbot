import { Component, OnInit } from '@angular/core';
import { AiService } from 'src/app/service/ai.service';
import { Message, AiThought } from '../models/chat-message.model';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.scss'],
})
export class ChatUiComponent {
  userTitle = 'User Chat';
  aiTitle = 'AI Assistant';
  userStatus = 'Active';
  private lastActivityTime = Date.now();
  private idleTimer: any;
  messageLimit = 10;

  messages: Message[] = [
    {
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ];

  currentMessage = '';
  isTyping = false;

  constructor(private aiService: AiService) {
    this.startIdleTimer();
  }
  // AI perspective data
  aiThoughts: AiThought[] = [
    {
      text: 'User has joined the conversation. Initiating friendly greeting protocol.',
      timestamp: new Date(),
    },
  ];

  currentAiThought = '';
  isAiThinking = false;

  private startIdleTimer() {
    this.idleTimer = setInterval(() => {
      const timeSinceLastActivity = Date.now() - this.lastActivityTime;
      if (timeSinceLastActivity >= 60000) {
        // 1 minutes
        this.userStatus = 'Inactive';
      }
    }, 1000);
  }

  private updateActivity() {
    this.lastActivityTime = Date.now();
    this.userStatus = 'Active';
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.updateActivity();

      // Add user message
      this.messages.push({
        text: this.currentMessage,
        isUser: true,
        timestamp: new Date(),
      });

      // Show typing indicator
      this.isTyping = true;
      this.isAiThinking = true;
      this.scrollToBottom();
      this.scrollToBottomAi();

      // Simulate bot response
      this.aiService.getAIResponse(this.currentMessage).subscribe((res) => {
        this.isTyping = false;
        this.isAiThinking = false;

        this.messages.push({
          text: res,
          isUser: false,
          timestamp: new Date(),
        });

        // Add AI thought process
        this.aiThoughts.push({
          text: this.getAiThought(this.currentMessage),
          timestamp: new Date(),
        });

        this.scrollToBottom();
        this.scrollToBottomAi();
      });

      this.currentMessage = '';
    }
  }

  private getAiThought(userMessage: string): string {
    const thoughts = [
      `Analyzing user input: "${userMessage}". User query processed. Searching knowledge base for relevant information. Response generated -`,
    ];

    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  private scrollToBottomAi() {
    setTimeout(() => {
      const aiContainer = document.querySelector('.ai-thoughts');
      if (aiContainer) {
        aiContainer.scrollTop = aiContainer.scrollHeight;
      }
    }, 100);
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  trackByMessage(index: number, message: Message): number {
    return message.timestamp.getTime();
  }
}
